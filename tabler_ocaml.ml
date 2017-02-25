module type TABLER = sig
  type cell
  type table
  val make : string list -> table
  val addRow : table -> cell list -> table
  val export : table -> string list * (string * string) list list
end

module Tabler : TABLER = struct
  type cell = String of string | Pair of string * string
  type table = string list * cell list list
  let make headers = headers, []
  let addRow (headers, rows) row = (headers, row::rows)
  let export (headers, rows) =
    let convertcell = function
      | String s -> s, ""
      | Pair (s1, s2) -> s1, s2
    in
    let convertrow row =
      List.rev (List.fold_left (fun acc cell -> (convertcell cell)::acc) [] row)
    in
    let converttable table =
      List.fold_left (fun acc row -> (convertrow row)::acc) [] table
    in
    headers, converttable rows
end
