# jupyterlab-prodigy

[![Binder](https://beta.mybinder.org/badge.svg)](https://mybinder.org/v2/gh/gnestor/jupyterlab-prodigy/master?urlpath=lab)

A JupyterLab extension for annotating machine learning training sets using [Prodigy](https://prodi.gy/).

![demo](http://g.recordit.co/y0WM1ca9C8.gif)

## Requirements

- JupyterLab
- Prodigy

## Install

First, install the Python package:

```bash
pip install jupyterlab-prodigy # or conda install -c conda-forge jupyterlab-prodigy
```

Then, install the JupyterLab extension

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
npm run build
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

In a notebook cell:

```python
!prodigy custom-recipe my_dataset /path/to/data.jsonl
```
