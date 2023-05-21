// createComponent.js
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please supply a valid component name');
  process.exit(1);
}

const componentDirectory = `./src/src/components/${componentName}`;

if (fs.existsSync(componentDirectory)) {
  console.error(`Component ${componentName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(componentDirectory);

// Create the component file
fs.writeFileSync(
  path.join(componentDirectory, `${componentName}.tsx`),
  `import React from 'react';

export interface ${componentName}Props {
}

export const ${componentName}: React.FC<${componentName}Props> = () => {
  return <div>${componentName} works</div>;
};
`
);

// Create the Storybook file
fs.writeFileSync(
  path.join(componentDirectory, `${componentName}.stories.tsx`),
  `import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ${componentName} } from './${componentName}';

export default {
  title: '${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {};
`
);

// Create the test file
fs.writeFileSync(
  path.join(componentDirectory, `${componentName}.test.tsx`),
  `import React from 'react';
import { render } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

test('renders component', () => {
  render(<${componentName} />);
});
`
);

console.log(`Component ${componentName} was created successfully.`);
