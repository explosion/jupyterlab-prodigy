import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  Dialog,
  IClientSession,
  InstanceTracker,
  showDialog
} from '@jupyterlab/apputils';

import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';

import { Kernel } from '@jupyterlab/services';

import { IConsoleTracker, ConsolePanel } from '@jupyterlab/console';

import { Message } from '@phosphor/messaging';

import { Widget } from '@phosphor/widgets';

import '../style/index.css';

class ProdigyIFrameWidget extends Widget {
  /**
   * Construct a new ProdigyIFrameWidget.
   */
  constructor(
    id: string,
    url: string = '//localhost:8080',
    session?: IClientSession
  ) {
    super();
    this.id = id;
    this.title.label = 'Prodigy';
    this.title.iconClass = 'jp-prodigyIcon';
    this.title.closable = true;
    this.addClass('jp-prodigyWidget');
    // Add jp-IFrame class to keep drag events from being lost to the iframe
    // See https://github.com/phosphorjs/phosphor/issues/305
    // See https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils/style/iframe.css#L17-L35
    this.addClass('jp-IFrame');

    this.iframe = document.createElement('iframe');
    this.iframe.id = 'iframe-' + this.id;
    this.iframe.src = url;
    this.iframe.setAttribute('baseURI', url);
    this.node.appendChild(this.iframe);

    this.url = url;
    this.port = url.match(/\/\/.+:(\d{4})/)[1];

    this.session = session;
  }

  /**
   * Handle update requests for the widget.
   */
  onUpdateRequest(msg: Message): void {
    this.iframe.src += '';
  }

  /**
   * Handle close requests for the widget.
   */
  onCloseRequest(msg: Message): void {
    void showDialog({
      title: 'Unsaved Changes',
      body: 'Do you want to close with unsaved changes?',
      buttons: [
        Dialog.cancelButton({ label: 'No' }),
        Dialog.okButton({ label: 'Yes' })
      ]
    }).then(result => {
      if (result.button.accept) {
        if (this.session) {
          this.session.kernel.requestExecute(
            {
              code: `!lsof -t -i tcp:${this.port} | xargs kill`
            },
            true
          );
        }
        this.dispose();
      }
    });
  }

  /**
   * The iframe element associated with the widget.
   */
  readonly iframe: HTMLIFrameElement;

  /**
   * The Prodigy server URL.
   */
  readonly url: string;

  /**
   * The Prodigy server port.
   */
  readonly port: string;

  /**
   * The client session associoated with the widget.
   */
  readonly session: IClientSession;
}

/**
 * Activate the extension.
 */
function activate(
  app: JupyterFrontEnd,
  restorer: ILayoutRestorer,
  notebooks: INotebookTracker,
  consoles: IConsoleTracker
) {
  const tracker = new InstanceTracker<ProdigyIFrameWidget>({
    namespace: 'prodigy-widget'
  });

  // Watch messages for notebook and console sessions
  function watchMessages(
    sender: INotebookTracker | IConsoleTracker,
    panel: NotebookPanel | ConsolePanel
  ): void {
    const { session } = panel;
    // When a session is created
    session.ready.then(() => {
      // Start watching kernel messages
      function handleKernel() {
        const { kernel } = session;
        session.kernel.ready
          .then(() => Kernel.connectTo(kernel.model))
          .then(kernel => {
            // On kernel message
            kernel.anyMessage.connect((sender, args) => {
              const { msg } = args;
              if (
                msg.header.msg_type === 'stream' &&
                (msg.content.text as string).match(
                  /Open the app in your browser and start annotating!/
                )
              ) {
                const id = msg.header.msg_id;
                const url = (msg.content.text as string).match(
                  /Starting the web server at (.+) \.\.\./
                )[1];
                const widget = new ProdigyIFrameWidget(id, url, session);
                app.shell.add(widget, 'main', {
                  activate: true,
                  mode: 'split-right'
                });
                void tracker.add(widget);
                widget.update();
              }
            });
          });
      }
      handleKernel();
      session.kernelChanged.connect(handleKernel);
    });
  }

  // Watch notebook creation.
  notebooks.widgetAdded.connect(watchMessages);

  // Watch console creation.
  consoles.widgetAdded.connect(watchMessages);

  // Handle state restoration.
  if (restorer) {
    restorer.restore(tracker, {
      command: 'prodigy:open',
      args: widget => ({
        id: widget.id,
        url: widget.url
      }),
      name: widget => widget.title
    });
  }

  app.commands.addCommand('prodigy:open', {
    label: 'Open a new Prodigy panel',
    execute: args => {
      if (tracker.currentWidget) {
        return app.shell.activateById(tracker.currentWidget.id);
      }
      const widget = new ProdigyIFrameWidget(
        args['id'] as string,
        args['url'] as string
      );
      app.shell.add(widget, 'main', {
        activate: true,
        mode: 'split-right'
      });
      void tracker.add(widget);
      widget.update();
    },
    isEnabled: () => true
  });
}

/**
 * Create jupyterlab-prodigy extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-prodigy',
  autoStart: true,
  requires: [ILayoutRestorer, INotebookTracker, IConsoleTracker],
  activate: activate
};

export default extension;
