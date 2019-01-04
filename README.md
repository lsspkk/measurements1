# measurements1

Get your Google API keys, and set them up in a file e.g. env.sh outside version control folder, with this contents

          #!/usr/bin/env sh
          export GOOGLE_CLIENT_ID=[your own client id]
          export GOOGLE_CLIENT_SECRET=[your own client secret]
          
In Bash run the script like this to get environment variables set up for your shell
          . ./env.sh
