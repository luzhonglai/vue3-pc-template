const req: any = require.context('.', false, /\.svg$/)
const requireAll: any = (requireContext: any) => {
  requireContext.keys().map(requireContext)
}
requireAll(req)
