export default function FormComponent({ 
  children, 
  onSubmit,
  formContainer,
  formContent,
  formFooter
}) {
  return (
    <div className={formContainer || 'max-w-150 mx-auto px-5'}>
      
      <form
        onSubmit={onSubmit}
        noValidate
        className={formContent || 'max-w-175 mx-auto mt-10 mb-12.5 shadow-2xl rounded-[20px] py-7.5 px-15 border-t-5 border-[#833132] bg-white'}
      >
        {children}
      </form>

      {formFooter && (
        <div className="text-center mt-4">
          <p>
            {formFooter.text}{' '}
            <a 
              href="#"
              onClick={formFooter.onClick}
              className="text-[#833132] font-semibold"
            >
              {formFooter.linkText}
            </a>
          </p>
        </div>
      )}
    </div>
  )
}