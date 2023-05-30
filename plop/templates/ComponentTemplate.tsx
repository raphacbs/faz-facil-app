import React from 'react';
import { View } from 'react-native';

interface {{pascalCase name}}Props {
  {{#each props}}
  {{this.name}}: {{this.type}};
  {{/each}}

}

const {{pascalCase name}}: React.FC<{{pascalCase name}}Props> = (props: {{pascalCase name}}Props) => {
  return (
    <View>
        
    </View>
  );
};

export default {{pascalCase name}};
