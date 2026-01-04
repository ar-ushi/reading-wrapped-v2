import { Component, createSignal, Show } from "solid-js";
import { Heading } from "./ui";

type BookCoverProps = {
  coverUrl?: string;
  title: string;
  author: string;
};

const BookCover: Component<BookCoverProps> = (props) => {
  const [imgOk, setImgOk] = createSignal(true);

  return (
    <Show
      when={imgOk() && props.coverUrl}
      fallback={
        <div
          class="
            w-full h-full flex items-center justify-center
            bg-gradient-to-br from-white/10 to-white/30
            text-center
          "
        >
          <div>
            <Heading variant="h5" compact>
              {props.title}
            </Heading>
               <Heading variant="h6" compact>
              {props.author}
            </Heading>
          </div>
        </div>
      }
    >
      <img
        src={props.coverUrl}
        alt={props.title}
        class="w-full h-full object-cover"
        onError={() => setImgOk(false)}
        onLoad={(e) => {
          const img = e.currentTarget;
          console.log(img);
          if (img.naturalWidth < 40 || img.naturalHeight < 60) {
            setImgOk(false);
          }
        }}
      />
    </Show>
  );
};

export default BookCover;
