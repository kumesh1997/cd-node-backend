module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {},
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/src/config/", "/src/controllers/", "/src/managers/", "/src/repository/", "/src/middlewares/"],
  modulePathIgnorePatterns: ["/dist/"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/@core/**",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/server.ts",
    "!src/config/**/*.ts",
    "!src/helpers/*.ts",
    "!src/middlewares/error.middleware.ts",
    "!src/middlewares/notfound.middleware.ts",
    "!src/routes/base.routing.ts",
    "!src/routes/route-creator.ts",
    "!src/types/**",
    "!src/controllers/**",
    "!src/middlewares/**",
    "!src/services/env-secret-manager.service.ts",
    "!src/services/redis-cache/redisClient.ts"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text", "html"],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 80,
      statements: 80
    }
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-results/junit",
        outputName: "results.xml"
      }
    ]
  ]
};
