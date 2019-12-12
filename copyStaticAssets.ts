import * as shell from 'shelljs';

shell.rm('-rf', 'dist/email-templates');
shell.cp('-Rf', 'src/email-templates', 'dist/email-templates');
