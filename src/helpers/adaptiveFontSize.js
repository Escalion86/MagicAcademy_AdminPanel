const adaptiveFontSize = (deviceSize) => ({
  extra:
    deviceSize === 3 ? 'text-6xl' : deviceSize === 2 ? 'text-5xl' : 'text-4xl',
  title:
    deviceSize === 3 ? 'text-4xl' : deviceSize === 2 ? 'text-3xl' : 'text-2xl',
  big:
    deviceSize === 3 ? 'text-3xl' : deviceSize === 2 ? 'text-2xl' : 'text-xl',
  large:
    deviceSize === 3 ? 'text-2xl' : deviceSize === 2 ? 'text-xl' : 'text-lg',
  normal:
    deviceSize === 3 ? 'text-xl' : deviceSize === 2 ? 'text-lg' : 'text-base',
  small:
    deviceSize === 3 ? 'text-base' : deviceSize === 2 ? 'text-base' : 'text-sm',
})

export default adaptiveFontSize
