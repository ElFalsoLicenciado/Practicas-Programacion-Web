export default function Card ({ children, onClick, className = "" }) {
  return (
      <div className={className} onClick={onClick}>
          {children}
      </div>
  );
};

