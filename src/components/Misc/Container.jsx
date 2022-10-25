import clsx from 'clsx'

export function Container({ className, maxWidth="max-w-7xl", ...props }) {
  return (
    <div
      className={clsx('mx-auto px-4 sm:px-6 lg:px-8', maxWidth, className)}
      {...props}
    />
  )
}
