import { Controller, useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import {
  Button,
  DatePicker,
  Drawer,
  Input,
  InputNumber,
  Message,
  Rate,
  SelectPicker,
  TagPicker,
  Toggle,
  useToaster,
} from "rsuite";
import { Icon } from "@rsuite/icons";
import { Movie, useDataService } from "../../services/DataService";

import "./styles.css";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export const NewMovieForm = ({ onClose }: any) => {
  const toaster = useToaster();

  const initmovie = {
    type: "",
    title: "",
    summary: "",
    description: "",
    category: "",
    location: "",
    imageUrl: "",
    isFeatured: false,
    year: "",
    rating: 3,
    actors: [],
  } as any;

  const { editedMovie } = useDataService();
  console.log("Edited", editedMovie);

  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: editedMovie || initmovie,
  });

  const { addNewMovie } = useDataService();
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const values = getValues();
    reset({ ...values, imageUrl: image && image.dataURL });
  }, [image]);

  const onAddNewmovie = (movieData: typeof initmovie) => {
    addNewMovie({ ...movieData, imageUrl: image.dataURL }).then((data) => {
      toaster.push(<Message type="success">movie added successfully</Message>);
      onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit(onAddNewmovie)}>
      <Drawer.Body>
        <div className="formRow">
          <label>Category</label>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value, ref } }) => (
              <SelectPicker
                data={[
                  { value: "horror", label: "Horror" },
                  { value: "thriller", label: "Thriller" },
                  { value: "action", label: "Action" },
                  { value: "documentary", label: "Documentary" },
                  { value: "drama", label: "Drama" },
                  { value: "marvel", label: "Marvel" },
                ]}
                onChange={onChange}
                value={value}
                ref={ref}
                style={{ width: "100%" }}
              />
            )}
          />
        </div>

        <div className="formRow">
          <label>Title</label>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value, ref } }) => (
              <Input
                placeholder="title"
                onChange={onChange}
                ref={ref}
                value={value}
              />
            )}
          />
        </div>

        <div className="formRow">
          <label>Summary</label>
          <Controller
            control={control}
            name="summary"
            render={({ field: { onChange, value, ref } }) => (
              <Input
                as="textarea"
                onChange={onChange}
                ref={ref}
                value={value}
              />
            )}
          />
        </div>

        <div className="formRow">
          <label>Description</label>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value, ref } }) => (
              <Input
                as="textarea"
                onChange={onChange}
                ref={ref}
                value={value}
              />
            )}
          />
        </div>

        <div className="formRow">
          <label>Year</label>
          <Controller
            control={control}
            name="year"
            render={({ field: { onChange, ref, value } }) => (
              <InputNumber onChange={onChange} ref={ref} value={value} />
            )}
          />
        </div>

        <div className="formRow">
          <label>Actors</label>
          <Controller
            control={control}
            name="year"
            render={({ field: { onChange, ref } }) => (
              <TagPicker
                creatable
                data={[]}
                style={{ width: 300 }}
                menuStyle={{ width: 300 }}
                placeholder="Actors Select"
                onCreate={(value, item) => {
                  console.log(value, item);
                }}
              />
            )}
          />
        </div>

        <div className="formRow">
          <label>Rating</label>
          <Controller
            control={control}
            name="rating"
            render={({ field: { onChange, ref, value } }) => (
              <Rate onChange={onChange} ref={ref} value={value} />
            )}
          />
        </div>

        <div className="formRow">
          <label>Is movie featured?</label>
          <Controller
            control={control}
            name="isFeatured"
            render={({ field: { onChange, ref } }) => (
              <Toggle onChange={onChange} ref={ref} />
            )}
          />
        </div>

        <div className="formRow">
          <label>movie Picture</label>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange, value, ref } }) => {
              const onChangeHandler = (imageList: any, addUpdateIndex: any) => {
                setImage(imageList[imageList.length - 1]);
                onChange();
              };

              return (
                <ImageUploading
                  value={value as any}
                  onChange={onChangeHandler}
                  maxNumber={1}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                  }) => {
                    return (
                      // write your building UI

                      <div className="upload__image-wrapper">
                        <Button
                          appearance="primary"
                          className="appButton"
                          ref={ref}
                          onClick={onImageUpload}
                        >
                          <Icon
                            as={FaCloudUploadAlt}
                            color="#fff"
                            style={{ marginRight: "12px" }}
                          />
                          Upload a photo
                        </Button>
                        &nbsp;
                        <div
                          className="image-item"
                          style={{ marginTop: "8px" }}
                        >
                          {image && (
                            <img src={image.dataURL} alt="" width="100" />
                          )}
                        </div>
                      </div>
                    );
                  }}
                </ImageUploading>
              );
            }}
          />
        </div>
      </Drawer.Body>
      <Drawer.Actions>
        <Button
          appearance="ghost"
          className="appButtonOutlined"
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button type="submit" appearance="primary" className="appButton">
          Add movie
        </Button>
      </Drawer.Actions>
    </form>
  );
};
