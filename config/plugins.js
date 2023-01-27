module.exports = () => {
    return {
        ckeditor: {
            enabled: true,
        },
        todo: {
            enabled: true,
            resolve: './src/plugins/rearrange-blogs',
          }
    }
}