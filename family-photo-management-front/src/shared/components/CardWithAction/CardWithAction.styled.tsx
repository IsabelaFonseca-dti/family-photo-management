import styled from "@emotion/styled";
import { theme } from "../../theme/theme";

export const CardContainer = styled.div({
  width: "200px",
  padding: "1rem ",
  border: "1px solid #ccc",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  height: "auto",
  backgroundColor: `${theme.colorPalette.contrast}`,
  color: `${theme.colorPalette.primary}`,
});

export const CardTitle = styled.h3({
  fontSize: "1.5rem",
  margin: 0,
});

export const CardSubtitle = styled.p({
  fontSize: "1rem",
});

export const ActionButton = styled.button({
  width: "100%",
  padding: "10px",
  backgroundColor: `${theme.colorPalette.accentSecondary}`,
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
});
