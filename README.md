# Tabler

## API

### `type cell = string | string list`

Each cell is either:

1. A string, the contents
2. A string and a string to be revealed on click

### `Tabler : name list -> cell list list -> Tabler.t`

Create a `Tabler.t`. Takes a list of names (headers) and 2D array of cells that
is the table. 

### `Tabler.addRow : Tabler.t -> cell list -> Tabler.t`

Add a row to the table.

### `Tabler.toHTML : Tabler.t -> HTMLElement`

Generate an HTML element (I think this is the right type) that can be appended
to the DOM.

## Usage

See [index.html](index.html).

## License

MIT
