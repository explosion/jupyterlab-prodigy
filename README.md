# jupyterlab-prodigy

[![Binder](https://beta.mybinder.org/badge.svg)](https://mybinder.org/v2/gh/gnestor/jupyterlab-prodigy/master?urlpath=lab)

A JupyterLab extension for annotating machine learning training sets using [Prodigy](https://prodi.gy/).

![demo](http://g.recordit.co/y0WM1ca9C8.gif)

## Requirements

- JupyterLab
- Prodigy

## Install

**jupyterlab-prodigy is in beta** and not yet published. Follow the *Develop*
instructions below ot install.

```bash
jupyter labextension install jupyterlab-prodigy
```

## Develop

```bash
git clone https://github.com/explosionai/jupyterlab-prodigy
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

## Usage

See the [Prodigy docs](https://prodi.gy/docs/) to learn more about how to use
Prodigy. 

Prodigy can be run using the `prodigy` command line utility or the
Python library. A Prodigy command looks like `prodigy my_recipe my_dataset /path/to/data.jsonl`.

In a notebook or console cell:

```python
!prodigy ner.teach my_set en_core_web_sm news_headlines.jsonl
```

Or from the terminal:

```bash
prodigy ner.teach my_set en_core_web_sm news_headlines.jsonl
```

Or you can use the Prodigy Python library in a notebook or console:

```python
prodigy.serve('ner.teach', 'my_set', 'en_core_web_sm', 'news_headlines.jsonl', 
              None, None, ['PERSON', 'ORG'], None, None)
```
