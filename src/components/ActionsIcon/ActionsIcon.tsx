import { Icon } from "@rsuite/icons";
import { FaEllipsisH } from "react-icons/fa";
import { IconButton } from "rsuite";
import { getCategoryColor } from "../../utils/getCategoryColor";
import "./styles.css";

interface Props {
  ref: any;
  category: string;
}

export const ActionsIcon = ({ ref, category, ...props }: Props) => {
  const backgroundColor = getCategoryColor(category);

  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<Icon as={FaEllipsisH} color="#fff" />}
      className="iconButton-icon"
      style={{ backgroundColor }}
    />
  );
};
