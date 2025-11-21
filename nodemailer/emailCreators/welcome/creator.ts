import TEMPLATE from './template';

function creator(fullName: string, intro: string) {
  return TEMPLATE.replace('{{name}}', fullName).replace('{{intro}}', intro);
}

export default creator;
