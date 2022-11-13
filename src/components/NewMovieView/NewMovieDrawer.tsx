import { Drawer } from "rsuite";
import { NewMovieForm } from "./NewMovieForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const NewMovieDrawer = ({ open, onClose }: Props) => {
  return (
    <Drawer open={open} onClose={() => onClose()} size="lg">
      <Drawer.Header>
        <Drawer.Title>Add new movie</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <NewMovieForm onClose={onClose} />
      </Drawer.Body>
    </Drawer>
  );
};
