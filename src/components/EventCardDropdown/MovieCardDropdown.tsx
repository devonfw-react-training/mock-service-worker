import { Dropdown } from "rsuite";
import { ActionsIcon } from "../ActionsIcon";
import "./styles.css";

interface Props {
  category: string;
  actions: Array<{ action: (event: any) => any; label: string }>;
}

export const EventCardDropdown = ({ actions, category }: Props) => {
  const renderIconButton = (props: any, ref: any) => {
    return <ActionsIcon {...props} category={category} />;
  };
  return (
    <div className="eventCard__dropdown">
      <Dropdown renderToggle={renderIconButton}>
        {actions.map((a) => (
          <Dropdown.Item key={a.label} onClick={a.action}>
            {a.label}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};
