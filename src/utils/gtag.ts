import { GA_ID } from 'constants/env';

export const pageview = (path: string) => {
  if (!GA_ID) return;
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
