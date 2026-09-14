import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_POSTHOG_PROJECT_TOKEN: {
		public: true
	},
	PUBLIC_POSTHOG_HOST: {
		public: true
	}
});
