# jupyterlab-prodigy

This repo contains a [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/)
extension for [Prodigy](https://prodi.gy), our scriptable annotation tool for
creating training data for machine learning models. In order to use this
extension, you'll need a license for Prodigy – [see this page](https://prodi.gy/buy)
for more details. For questions, please use the
[Prodigy Support Forum](https://support.prodi.gy). If you've found a bug, feel
free to submit a
[pull request](https://github.com/explosion/jupyterlab-prodigy/pulls).

🙏 **Special thanks** to Jupyter core dev [Grant Nestor](https://www.grantnestor.com/)
for building this extension for us!

[![Binder](https://beta.mybinder.org/badge.svg)](https://mybinder.org/v2/gh/gnestor/jupyterlab-prodigy/master?urlpath=lab)
[![npm](https://img.shields.io/npm/v/jupyterlab-prodigy.svg?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/jupyterlab-prodigy)

![jupyterlab-prodigy](https://user-images.githubusercontent.com/13643239/60034585-499b4f80-96ab-11e9-9624-711f71d01b9b.gif)

## ⌛️ Installation

To use this extension, you need [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/) >= 1.0.0 ⚠️ and [Prodigy](https://prodi.gy).

```bash
pip install jupyterlab==1.0.0rc0
```

```bash
jupyter labextension install jupyterlab-prodigy
```

## 📋Usage

Prodigy can be run using the `prodigy` command line utility or the
Python library. When the server starts, a new tab with the Prodigy app will be opened automatically in your JupyterLab workspace.

### In a notebook or console cell

```
!prodigy ner.teach my_set en_core_web_sm news_headlines.jsonl
```

### From the JupyterLab terminal

```bash
prodigy ner.teach my_set en_core_web_sm news_headlines.jsonl
```

### From Python

```python
prodigy.serve('ner.teach', 'my_set', 'en_core_web_sm', 'news_headlines.jsonl',
              None, None, ['PERSON', 'ORG'], None, None)
```

## 👩‍💻Develop

```bash
git clone https://github.com/explosion/jupyterlab-prodigy
cd jupyterlab-prodigy

# Install Javascript dependencies
npm install # or yarn

# Build JupyterLab extension
npm run build # or yarn build
jupyter labextension link .
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
