export type IconProps = React.SVGProps<SVGSVGElement>;

export const HomeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export const PaymentIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 8H4V6h16m1-2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H3V4h18v14zm-9-4h6v2h-6z" />
  </svg>
);

export const SettingsIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.35c.15-.12.19-.34.1-.51l-1.63-2.83c-.12-.22-.39-.3-.61-.22l-2.03.81c-.42-.32-.9-.58-1.42-.77l-.31-2.15c-.05-.24-.24-.41-.5-.41h-3.26c-.26 0-.45.17-.49.41l-.31 2.15c-.52.19-1 .45-1.42.77l-2.03-.81c-.22-.09-.49 0-.61.22L2.04 8.25c-.09.17-.05.39.1.51l1.72 1.35c-.05.3-.07.62-.07.94s.02.64.07.94l-1.72 1.35c-.15.12-.19.34-.1.51l1.63 2.83c.12.22.39.3.61.22l2.03-.81c.42.32.9.58 1.42.77l.31 2.15c.05.24.24.41.5.41h3.26c.26 0 .45-.17.49-.41l.31-2.15c.52-.19 1-.45 1.42-.77l2.03.81c.22.09.49 0 .61-.22l1.63-2.83c.09-.17.05-.39-.1-.51l-1.72-1.35zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

export const MenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export const CloseIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const BackIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);

export const BankIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 19V22H2V19C2 18.45 2.45 18 3 18H21C21.55 18 22 18.45 22 19Z"
      fill="#0A66C2"
      stroke="#0A66C2"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M7 11H5V18H7V11Z" fill="#0A66C2" />
    <path d="M11 11H9V18H11V11Z" fill="#0A66C2" />
    <path d="M15 11H13V18H15V11Z" fill="#0A66C2" />
    <path d="M19 11H17V18H19V11Z" fill="#0A66C2" />
    <path
      d="M23 22.75H1C0.59 22.75 0.25 22.41 0.25 22C0.25 21.59 0.59 21.25 1 21.25H23C23.41 21.25 23.75 21.59 23.75 22C23.75 22.41 23.41 22.75 23 22.75Z"
      fill="#0A66C2"
    />
    <path
      d="M21.37 5.74984L12.37 2.14984C12.17 2.06984 11.83 2.06984 11.63 2.14984L2.63 5.74984C2.28 5.88984 2 6.29984 2 6.67984V9.99984C2 10.5498 2.45 10.9998 3 10.9998H21C21.55 10.9998 22 10.5498 22 9.99984V6.67984C22 6.29984 21.72 5.88984 21.37 5.74984ZM12 8.49984C11.17 8.49984 10.5 7.82984 10.5 6.99984C10.5 6.16984 11.17 5.49984 12 5.49984C12.83 5.49984 13.5 6.16984 13.5 6.99984C13.5 7.82984 12.83 8.49984 12 8.49984Z"
      fill="#0A66C2"
    />
  </svg>
);

export const CardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.125 4.5H4.875C3.42525 4.5 2.25 5.67525 2.25 7.125V16.875C2.25 18.3247 3.42525 19.5 4.875 19.5H19.125C20.5747 19.5 21.75 18.3247 21.75 16.875V7.125C21.75 5.67525 20.5747 4.5 19.125 4.5Z"
      stroke="#0A66C2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.25 9H21.75M6 14.0625H8.25V15H6V14.0625Z"
      stroke="#0A66C2"
      stroke-width="1.875"
      stroke-linejoin="round"
    />
  </svg>
);

export const MailIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export const LockIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
  </svg>
);

export const EyeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

export const EyeOffIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.83 9L15.23 12.39c.03-.2.05-.42.05-.64 0-1.66-1.34-3-3-3-.22 0-.44.02-.64.07zm7.29-2.04l2.76 2.76c.44-1.19.73-2.51.73-3.9C20.76 5.56 17.72 2 12 2 6.44 2 1.73 5.25 0 10c.49 1.45 1.1 2.82 1.84 4.07l2.85-2.85c-.05-.21-.08-.43-.08-.65 0-1.66 1.34-3 3-3 .22 0 .44.03.65.08l5.86-5.86zM19.12 15.39l2.76 2.76c1.74-1.65 3.28-3.72 4.38-6.03-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.2-4.03.57l2.77 2.77c.98-.29 2.05-.48 3.26-.48 5.66 0 9.75 4.09 9.75 9.75 0 1.21-.19 2.38-.48 3.51zm-9.01-3.66c-.76 0-1.44-.3-1.93-.79-.49-.49-.79-1.17-.79-1.93 0-.76.3-1.44.79-1.93.49-.49 1.17-.79 1.93-.79.76 0 1.44.3 1.93.79.49.49.79 1.17.79 1.93 0 .76-.3 1.44-.79 1.93-.49.49-1.17.79-1.93.79z" />
  </svg>
);

export const CheckIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

export const LogoutIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

export const MoreIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-1.1 2-2.5S13.1 3 12 3s-2 .9-2 2.5S10.9 8 12 8zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export const StudentIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const Logo = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="68"
      height="71"
      viewBox="0 0 68 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M37.0781 10.0365C37.0781 6.65073 41.1957 4.98202 43.5528 7.41253L65.2723 29.808C66.7027 31.2829 67.5027 33.2568 67.5027 35.3115V61.234C67.5027 64.6198 63.3851 66.2885 61.028 63.858L39.3085 41.4625C37.8781 39.9876 37.0781 38.0137 37.0781 35.9591V10.0365Z"
        fill="#9E97FF"
      />
      <path
        d="M18.2246 9.30019C18.2246 5.9144 22.3422 4.2457 24.6993 6.67621L46.0983 28.7411C47.7343 30.428 48.6492 32.6856 48.6492 35.0355V60.4977C48.6492 63.8835 44.5316 65.5522 42.1745 63.1217L20.455 40.7262C19.0246 39.2513 18.2246 37.2774 18.2246 35.2227V9.30019Z"
        fill="#4CBFFF"
      />
      <path
        d="M0 10.0365C0 6.65073 4.11755 4.98202 6.4747 7.41253L28.1942 29.808C29.6246 31.2829 30.4246 33.2568 30.4246 35.3115V61.234C30.4246 64.6198 26.307 66.2885 23.9499 63.858L2.23038 41.4625C0.79996 39.9876 0 38.0137 0 35.9591V10.0365Z"
        fill="#4A3AFF"
      />
    </svg>
  );
};
