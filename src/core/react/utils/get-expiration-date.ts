import type * as Muxa from "../../../types";

interface Props {
  meta?: Muxa.MetaFunction;
  params: Muxa.Params;
}

export function getExpirationDate({ meta, params }: Props) {
  let expires = meta && meta({ params }).expires;
  if (!expires) {
    const currentDate = new Date();
    // Defaults to one minute
    currentDate.setTime(currentDate.getTime() + 1000 * 60);
    expires = currentDate;
  }
  return expires;
}
