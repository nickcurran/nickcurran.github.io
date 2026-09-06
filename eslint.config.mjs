import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ['src/app/movies/page.tsx'],
    rules: {
      // localStorage is unavailable during static prerender, so persisted
      // state must be hydrated in an effect rather than at render time.
      'react-hooks/set-state-in-effect': 'off'
    }
  }
]

export default eslintConfig
