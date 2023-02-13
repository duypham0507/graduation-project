import classNames from 'classnames';

interface IProps {
  errorMessage?: string
  template?: 'white' | 'green'
  className?: string;
}
export function FormErrorWrapper({ errorMessage, template, className }: IProps) {
  let mainClass = classNames(
    ' text-xs h-[26px] mt-[-8px] mb-2 flex items-center px-2',
    {
      'bg-baseRed-20 ': !template
    },
    {
      'bg-white pl-0': template == 'white'
    },
    {
      'bg-[#F4FCFA] pl-0': template == 'green'
    }
  )

  return (
    <div className={classNames(mainClass, { hidden: !errorMessage }, className)}>
      {/* <FormError errorMessage={errorMessage} /> */}
    </div>
  )
}