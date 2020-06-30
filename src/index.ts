import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  Dialog,
  ICommandPalette,
  MainAreaWidget,
  showDialog,
  WidgetTracker
} from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { Message } from '@lumino/messaging';
import { Widget } from '@lumino/widgets';
import '../style/index.css';

const defaultProdigyUrl = 'http://localhost:8080';
const prodigyDocsUrl = 'https://prodi.gy/docs';
const prodigyIconClass = 'jp-prodigyIcon';
const prodigyDocsIconClass = 'jp-docsIcon';

class ProdigyIFrameWidget extends Widget {
  /**
   * Construct a new ProdigyIFrameWidget.
   */
  constructor(public url: string = defaultProdigyUrl) {
    super();
    this.title.label = 'Prodigy';
    this.title.iconClass = prodigyIconClass;
    this.title.closable = true;
    this.addClass('jp-prodigyWidget');
    // Add jp-IFrame class to keep drag events from being lost to the iframe
    // See https://github.com/phosphorjs/phosphor/issues/305
    // See https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils/style/iframe.css#L17-L35
    this.addClass('jp-IFrame');

    this.iframe = document.createElement('iframe');
    this.iframe.id = 'iframe-' + this.id;
    this.iframe.src = this.url;
    this.iframe.setAttribute('baseURI', this.url);
    this.node.appendChild(this.iframe);
  }

  /**
   * The iframe element associated with the widget.
   */
  readonly iframe: HTMLIFrameElement;
}

class ProdigyDocsIFrameWidget extends Widget {
  constructor(public url: string = prodigyDocsUrl) {
    super();
    this.title.label = 'Prodigy Docs';
    this.title.iconClass = prodigyDocsIconClass;
    this.title.closable = true;
    this.addClass('jp-prodigyWidget');
    // Add jp-IFrame class to keep drag events from being lost to the iframe
    // See https://github.com/phosphorjs/phosphor/issues/305
    // See https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils/style/iframe.css#L17-L35
    this.addClass('jp-IFrame');

    this.iframe = document.createElement('iframe');
    this.iframe.id = 'iframe-' + this.id;
    this.iframe.src = this.url;
    this.iframe.setAttribute('baseURI', this.url);
    this.node.appendChild(this.iframe);
  }

  /**
   * The iframe element associated with the widget.
   */
  readonly iframe: HTMLIFrameElement;
}

export class MainAreaProdigyWidget extends MainAreaWidget<ProdigyIFrameWidget> {
  onCloseRequest(msg: Message): void {
    void showDialog({
      title: 'Possible unsaved changes',
      body:
        'By closing the tab, you may lose unsaved annotations. Don\'t forget to hit the "save" button in the sidebar to submit your work.',
      buttons: [
        Dialog.cancelButton({ label: 'No' }),
        Dialog.okButton({ label: 'Yes' })
      ]
    }).then(result => {
      if (result.button.accept) {
        this.dispose();
        return true;
      } else {
        return false;
      }
    });
  }
}

/**
 * Activate the extension.
 */
async function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  restorer: ILayoutRestorer,
  settings: ISettingRegistry,
  launcher: ILauncher
) {
  const prodigyConfig = await settings.get(
    'jupyterlab-prodigy:plugin',
    'prodigyConfig'
  );
  const url = (prodigyConfig.composite as any)?.url || defaultProdigyUrl;
  const tracker = new WidgetTracker<MainAreaProdigyWidget>({
    namespace: 'prodigy-widget'
  });
  const docsTracker = new WidgetTracker<
    MainAreaWidget<ProdigyDocsIFrameWidget>
  >({
    namespace: 'prodigy-docs-widget'
  });
  let widget: MainAreaProdigyWidget;
  let docsWidget: MainAreaWidget<ProdigyDocsIFrameWidget>;

  const command = 'prodigy:open';
  app.commands.addCommand(command, {
    label: 'Open Prodigy',
    iconClass: prodigyIconClass,
    execute: () => {
      if (!widget || widget.isDisposed) {
        const content = new ProdigyIFrameWidget(url);
        widget = new MainAreaProdigyWidget({ content });
        widget.id = 'jupyterlab-prodigy-widget';
        widget.title.label = 'Prodigy';
        widget.title.closable = true;
      }

      if (!tracker.has(widget)) {
        tracker.add(widget);
      }

      if (!widget.isAttached) {
        app.shell.add(widget, 'main', {
          mode: 'split-right'
        });
      }
      widget.content.update();

      app.shell.activateById(widget.id);
    }
  });

  const docsCommand = 'prodigy:open-docs';
  app.commands.addCommand(docsCommand, {
    label: 'Open Prodigy Docs',
    iconClass: prodigyDocsIconClass,
    execute: () => {
      if (!docsWidget || docsWidget.isDisposed) {
        const content = new ProdigyDocsIFrameWidget();
        docsWidget = new MainAreaWidget({ content });
        docsWidget.id = 'jupyterlab-prodigy-docs-widget';
        docsWidget.title.label = 'Prodigy Docs';
        docsWidget.title.closable = true;
      }

      if (!docsTracker.has(docsWidget)) {
        docsTracker.add(docsWidget);
      }

      if (!docsWidget.isAttached) {
        app.shell.add(docsWidget, 'main', {
          mode: 'split-top'
        });
      }
      docsWidget.content.update();

      app.shell.activateById(docsWidget.id);
    }
  });

  palette.addItem({ command, category: 'Prodigy' });
  palette.addItem({ command: docsCommand, category: 'Prodigy' });

  restorer.restore(tracker, {
    command,
    name: () => 'prodigy-widget'
  });
  restorer.restore(docsTracker, {
    command: docsCommand,
    name: () => 'prodigy-docs-widget'
  });

  // Launcher
  launcher.add({
    command,
    category: 'Prodigy',
    rank: -10
  });
  launcher.add({
    command: docsCommand,
    category: 'Prodigy',
    rank: -5
  });
}

/**
 * Create jupyterlab-prodigy extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-prodigy',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer, ISettingRegistry, ILauncher],
  activate: activate
};

export default extension;
