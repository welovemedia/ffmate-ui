prepare:
	pnpm i

dev:
	pnpm run dev

build:
	pnpm run generate

test+unit:
	pnpm vitest --project unit

test+nuxt:
	pnpm vitest --project nuxt

test+e2e:
	pnpm playwright test
	# pnpm vitest --project e2e