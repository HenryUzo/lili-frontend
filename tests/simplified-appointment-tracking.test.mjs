import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const formSource = await readFile(
  new URL(
    "../src/app/components/appointment-form/SimplifiedAppointmentForm.tsx",
    import.meta.url,
  ),
  "utf8",
);

test("simplified booking tracks a successful appointment submission", () => {
  assert.match(
    formSource,
    /import \{ trackAppointmentSubmitted \} from "\.\.\/\.\.\/\.\.\/lib\/analytics";/,
  );

  const submitStart = formSource.indexOf(
    "const result = await submitSimplifiedAppointment(",
  );
  const trackingCall = formSource.indexOf(
    "trackAppointmentSubmitted({",
    submitStart,
  );
  const confirmationState = formSource.indexOf(
    'setState({ loading: false, error: "", confirmation:',
    submitStart,
  );

  assert.notEqual(submitStart, -1);
  assert.ok(trackingCall > submitStart);
  assert.ok(confirmationState > trackingCall);
  assert.match(
    formSource.slice(trackingCall, confirmationState),
    /petSpecies: fields\.petType/,
  );
  assert.match(
    formSource.slice(trackingCall, confirmationState),
    /preferredDatesCount: preferredSelections\.length/,
  );
});
