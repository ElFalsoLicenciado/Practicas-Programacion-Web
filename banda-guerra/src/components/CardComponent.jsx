export default function Card ({ children, onClick, className = "", style = {} }) {
  return (
      <div className={`card ${className}`} onClick={onClick} style={style}>
          {children}
      </div>
  );
};

