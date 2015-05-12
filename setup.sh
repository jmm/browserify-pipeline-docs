start_dir=$PWD
npm install

repo_prefix_url=https://github.com/jmm/
repo_prefix_name=browserify-pipeline-docs-
repo_suffix=.git

dir=content
repo=$repo_prefix_name$dir
git clone $repo_prefix_url$repo$repo_suffix
mv $repo $dir

dir=builder
repo=$repo_prefix_name$dir
git clone $repo_prefix_url$repo$repo_suffix
mv $repo $dir

cd $dir
npm install

cd $start_dir
