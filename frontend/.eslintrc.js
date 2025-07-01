module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended', // Or 'plugin:vue/vue3-strongly-recommended' or 'plugin:vue/vue3-essential'
    'prettier', // Add prettier to avoid conflicts with ESLint rules, make sure eslint-config-prettier is installed
  ],
  plugins: [
    // 'prettier' // eslint-plugin-prettier, ensure it's in devDependencies
  ],
  rules: {
    // Add custom rules here if needed
    // e.g., 'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off', // Nuxt pages often have a single root div
    'vue/multi-word-component-names': ['error', {
      'ignores': [
        // Layouts
        'default', 'landing', 'error',
        // Pages (including common directory names that might be used as components)
        'index', 'new', 'login', 'register', 'dashboard', 'manifesto', 'profile',
        // Dynamic pages (bracket notation itself isn't a word, so this might not be strictly necessary here,
        // but good to be aware. The actual component name is what matters.)
        // We mostly care about files like `pages/bounties/[id].vue` not being named `Id.vue` if extracted.
        // This rule applies to the <script setup name> or exported component name.
        // For file-based routing, Nuxt handles it. This rule is for component PascalCase names.
        // For pages, Nuxt uses the file name, so this rule is less about the file name itself and more if we define a name inside.
        // Let's assume page files are okay if they are single word as Nuxt convention.
        // The previous error was "Component name "[id]" should always be multi-word" which is about the *file name* being interpreted.
        // We will also add a glob pattern for pages later if needed or adjust this.
      ]
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'require-await': 'warn', // Often async functions are placeholders during dev
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    // Prettier rules can be managed by Prettier itself
  },
  settings: {
    'import/resolver': {
      typescript: {
        // project: './tsconfig.json', // Points to your root tsconfig.json
        // The .nuxt/tsconfig.json is generated, so we can't rely on it before the first build.
        // We might need to install eslint-import-resolver-alias if we use Nuxt aliases like ~/, @/
        // and tell ESLint about them. For now, let's see if this helps.
        // If errors persist, we might need to provide more specific path to tsconfig.json
        // or ensure that Nuxt generates its tsconfig before linting (hard in this env).
        // A common strategy is to have a root tsconfig.json that .nuxt/tsconfig.json extends.
        // We have 'frontend/tsconfig.json'
        project: 'tsconfig.json' // This should point to the tsconfig.json in the frontend directory
      }
    }
  },
  parserOptions: {
    // ecmaVersion: 2021, // Already handled by @nuxtjs/eslint-config-typescript
    // sourceType: 'module', // Already handled
    // project: './tsconfig.json', // This can also help the parser itself.
  },
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue', 'app.vue', 'error.vue'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
};
