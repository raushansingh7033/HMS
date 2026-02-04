import { useRef, useState } from "react";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES, type FileWithPath } from "@mantine/dropzone";
import classes from "./DropzoneButton.module.css";
import { uploadMedia } from "../../Service/MediaService";

export function DropzoneButton({ close, form, id }: any) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath | null>(null);
  const [fieldId, setFieldId] = useState<string | null>(null);
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles[0]);
    uploadMedia(acceptedFiles[0])
      .then((data) => {
        console.log("Uploaded file data:", data);
        setFieldId(data.id);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };
  const handleSave = () => {
    form.setFieldValue(id, fieldId);
    close();
  };
  return (
    <div className={classes.wrapper}>
      {!files ? (
        <Dropzone
          openRef={openRef}
          onDrop={handleDrop}
          className={classes.dropzone}
          radius="md"
          multiple={false}
          accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
          maxSize={5 * 1024 ** 2}
          aria-label="Drop files here"
        >
          <div style={{ pointerEvents: "none" }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  size={50}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={50}
                  stroke={1.5}
                  className={classes.icon}
                />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Drop photo here</Dropzone.Accept>
              <Dropzone.Reject> image file less than 5mb</Dropzone.Reject>
              <Dropzone.Idle>Upload profile picture</Dropzone.Idle>
            </Text>

            <Text className={classes.description}>
              Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
              <i>.jpg</i> or <i>.png</i> files that are less than 5mb in size.
            </Text>
          </div>
        </Dropzone>
      ) : (
        <img
          src={URL.createObjectURL(files)}
          alt="preview"
          className={classes.imagePreview}
        />
      )}

      {!files ? (
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          "Select picture
        </Button>
      ) : (
        <div className="flex justify-center gap-3 mt-3">
          <Button
            size="md"
            color="red"
            radius="xl"
            onClick={() => openRef.current?.()}
          >
            Change picture
          </Button>
          <Button size="md" radius="xl" color="green" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
