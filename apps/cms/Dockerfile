FROM directus/directus:latest AS cms

USER root
RUN corepack enable
USER node

RUN pnpm add @bicou/directus-extension-tiptap @tiptap/core^2  @tiptap/pm^2 @tiptap/starter-kit^2 @tiptap/extension-typography^2 @tiptap/extension-character-count^2 @tiptap/extension-text-style^2 @tiptap/extension-font-family^2 directus-extension-models
