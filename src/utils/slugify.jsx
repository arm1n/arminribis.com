const slugify = (string) => {
  const pattern = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const replace = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(
      new RegExp(pattern.split('').join('|'), 'g'),
      char => replace.charAt(pattern.indexOf(char))
    )
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default slugify;