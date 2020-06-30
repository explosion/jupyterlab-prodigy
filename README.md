# JupyterLab extension for the Prodigy annotation tool

This repo contains a [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/) extension for [Prodigy](https://prodi.gy), our scriptable annotation tool for creating training data for machine learning models. It lets you run Prodigy within a JupyterLab tab, and annotate as you develop your models and applications. In order to use this
extension, you'll need a license for Prodigy – [see this page](https://prodi.gy/buy) for more details. For questions, please use the [Prodigy Support Forum](https://support.prodi.gy). If you've found a bug, feel free to submit a [pull request](https://github.com/explosion/jupyterlab-prodigy/pulls).

🙏 **Special thanks** to Jupyter core dev [Grant Nestor](https://www.grantnestor.com/)
for helping us build this extension!

[![npm](https://img.shields.io/npm/v/jupyterlab-prodigy.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/jupyterlab-prodigy)

<img src="https://user-images.githubusercontent.com/13643239/60034585-499b4f80-96ab-11e9-9624-711f71d01b9b.gif" width="854">

<img src="https://user-images.githubusercontent.com/13643239/86128438-a5c85900-bae1-11ea-82d9-a466e31e0861.png" width="854" />

## ⌛️ Installation

To use this extension, you need [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/) >= 2.0.0 ⚠️ and [Prodigy](https://prodi.gy).

```bash
pip install jupyterlab>=2.0.0
```

```bash
jupyter labextension install jupyterlab-prodigy
```

## 📋 Usage

Start a Prodigy session in a terminal, e.g.:

```console
$ prodigy ner.manual my_set blank:en ./news_headlines.jsonl --label PERSON,ORG,PRODUCT
```

In another terminal session, start JupyterLab:

```console
$ jupyter lab
```

Then, inside of JupyterLab, open the `Commands` on the left sidebar, and search/type:

<kbd>Open Prodigy</kbd>

Execute it, you will have a new Prodigy panel on the side.

## ⚙ Configuration

If your Prodigy is being served at a URL different than the default (e.g. behind a reverse proxy) you can configure the URL to use in the settings.

Open the `Settings` menu, go to `Advanced Settings Editor`, select the settings for `Prodigy Jupyter Extension`, and there you can add your custom URL, e.g.:

```JSON
{
    "prodigyConfig": {
        "url": "https://prodigy.example.com"
    }
}
```

## 👩‍💻 Develop

```bash
git clone https://github.com/explosion/jupyterlab-prodigy
cd jupyterlab-prodigy

# Install Javascript dependencies
npm install # or yarn

# Build JupyterLab extension
npm run build # or yarn build
jupyter labextension install .
```

To rebuild the JupyterLab extension:

```bash
npm run build # or yarn build
jupyter lab build
```

To rebuild the JupyterLab extension automatically as the source changes:

```bash
# In one terminal tab, watch the jupyterlab-prodigy directory
npm run watch # or yarn watch

# In another terminal tab, run jupyterlab with the watch flag
jupyter lab --watch
```
