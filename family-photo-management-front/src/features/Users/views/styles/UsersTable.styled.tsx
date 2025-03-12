import styled from "@emotion/styled";
import { theme } from "../../../../shared/theme/theme";

export const Table = styled.table({
  width: "100%",
  borderCollapse: "collapse",
});

export const TableCell = styled.td({
  padding: "10px",
  border: "1px solid #ddd",
});

export const TableRow = styled.tr({
  textAlign: "left",
});

export const TableHeader = styled.th({
  padding: "10px",
  border: "1px solid #ddd",
  backgroundColor: `${theme.colorPalette.accentSecondary}`,
});

export const ActionButton = styled.button({
  padding: "5px 10px",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
});
