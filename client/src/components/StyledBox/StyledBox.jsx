import { Box } from "@mui/material";
import styles from './StyledBox.module.css';

export default function StyledBox({ children }) {
  return <Box className={styles.styled_box}>{ children }</Box>
}
