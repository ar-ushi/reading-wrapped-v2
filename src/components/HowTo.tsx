import type { Component } from "solid-js";
import { Card, Heading } from "./ui";
import { Slot } from "./Slot";
const HowTo: Component = (props) => {
  return (
    <div class="flex  item-center gap-4">
      <Card
        class="rounded-2xl
         border-2 border-dashed border-gray-300
         bg-white p-3"
      >
        <Slot name="heading">
          <Heading variant="h6" class="text-secondary" compact>
            Export Your Library - Goodreads
          </Heading>
        </Slot>
        <Slot name="content">
          <ol class="list-decimal list-inside p-0 text-sm text-gray-500">
            <li>
              Go to <strong>My Books</strong>.
            </li>
            <li>
              On the left sidebar, scroll down and click{" "}
              <strong>Import and Export</strong>.
            </li>
            <li>
              Under <strong>Export Your Library</strong>, click{" "}
              <strong>Export Library</strong>.
            </li>
            <li>
              Refresh the page until a <strong>Download CSV file</strong> link
              appears.
            </li>
          </ol>
        </Slot>
      </Card>
      <Card
        class="rounded-2xl
         border-2 border-dashed border-gray-300
         bg-white p-3"
      >
        <Slot name="heading">
          <Heading variant="h6" class="text-secondary" compact>
            Export Your Library - Storygraph
          </Heading>
        </Slot>
        <Slot name="content">
          <ol class="list-decimal list-inside p-0 text-sm text-gray-500">
            <li>
              Go to <strong>Manage Account</strong> on your profile.
            </li>
            <li>
              Sroll down to the
              <strong>Export Data </strong> section.
            </li>
            <li>
              Click <strong>Export Your Data</strong>.
            </li>
            <li>Storgraph generates a downloadable file (usually immediate)</li>
          </ol>
        </Slot>
      </Card>
    </div>
  );
};

export default HowTo;
