import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

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
  constructor(id: string, url: string = '//localhost:8080') {
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
  // onCloseRequest(msg: Message): void {
  //   // TODO: Kill prodigy server
  // }

  /**
   * The iframe element associated with the widget.
   */
  readonly iframe: HTMLIFrameElement;
}

/**
 * Activate the extension.
 */
function activate(
  app: JupyterFrontEnd,
  notebooks: INotebookTracker,
  consoles: IConsoleTracker
) {
  // Watch messages for notebook and console sessions
  function watchMessages(
    sender: INotebookTracker | IConsoleTracker,
    panel: NotebookPanel | ConsolePanel
  ): void {
    const { session } = panel;
    // When a session is created
    session.ready.then(() => {
      // Handle kernel messages that are output from prodigy server
      function handleMessage(
        sender: Kernel.IKernel,
        args: Kernel.IAnyMessageArgs
      ) {
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
          const widget = new ProdigyIFrameWidget(id, url);
          app.shell.add(widget, 'main', {
            activate: true,
            mode: 'split-right'
          });
          widget.update();
        }
      }
      // Start watching kernel messages
      function handleKernel() {
        const { kernel } = session;
        session.kernel.ready
          .then(() => Kernel.connectTo(kernel.model))
          .then(kernel => {
            kernel.anyMessage.connect(handleMessage);
          });
      }
      handleKernel();
      session.kernelChanged.connect(handleKernel);
    });
  }

  // Watch notebook creation
  notebooks.widgetAdded.connect(watchMessages);

  // Watch console creation
  consoles.widgetAdded.connect(watchMessages);
}

/**
 * Create jupyterlab-prodigy extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-prodigy',
  autoStart: true,
  requires: [INotebookTracker, IConsoleTracker],
  activate: activate
};

export default extension;
