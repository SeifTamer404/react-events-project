import { useRouteLoaderData } from "react-router";
import EventForm from "../components/EventForm";

function EditEventPage() {
  const { event } = useRouteLoaderData("event-detail");

  return <EventForm method="PATCH" event={event} />;
}
export default EditEventPage;
