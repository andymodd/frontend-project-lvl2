lint:
	npx eslint .

install:
	npm ci

test:
	npx jest

test-coverage:
	npm test --coverage --coverageProvider=v8

.PHONY: test