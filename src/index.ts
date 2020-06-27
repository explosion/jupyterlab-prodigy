import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  ICommandPalette,
  MainAreaWidget,
  WidgetTracker
} from '@jupyterlab/apputils';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { Widget } from '@lumino/widgets';
import '../style/index.css';

const defaultProdigyUrl = 'http://localhost:8080';

class ProdigyIFrameWidget extends Widget {
  /**
   * Construct a new ProdigyIFrameWidget.
   */
  constructor(public url: string = defaultProdigyUrl) {
    super();
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
    this.iframe.src = this.url;
    this.iframe.setAttribute('baseURI', this.url);
    this.node.appendChild(this.iframe);
  }

  /**
   * The iframe element associated with the widget.
   */
  readonly iframe: HTMLIFrameElement;
}

/**
 * Activate the extension.
 */
async function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  restorer: ILayoutRestorer,
  settings: ISettingRegistry
) {
  const prodigyConfig = await settings.get(
    'jupyterlab-prodigy:plugin',
    'prodigyConfig'
  );
  const url = (prodigyConfig.composite as any)?.url || defaultProdigyUrl;
  const tracker = new WidgetTracker<MainAreaWidget<ProdigyIFrameWidget>>({
    namespace: 'prodigy-widget'
  });
  let widget: MainAreaWidget<ProdigyIFrameWidget>;

  const command = 'prodigy:open';
  app.commands.addCommand(command, {
    label: 'Open Prodigy',
    execute: () => {
      if (!widget || widget.isDisposed) {
        const content = new ProdigyIFrameWidget(url);
        widget = new MainAreaWidget({ content });
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

  palette.addItem({ command, category: 'Prodigy' });

  restorer.restore(tracker, {
    command,
    name: () => 'prodigy-widget'
  });
}

/**
 * Create jupyterlab-prodigy extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-prodigy',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer, ISettingRegistry],
  activate: activate
};

export default extension;
