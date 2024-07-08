# set -x # uncomment this line when debugging
def_file_list=(`find ./localization_def -type f -printf "%f\n"`)

mkdir -p "localized"

for def_file in "${def_file_list[@]}"; do
    readarray def_list < "./localization_def/${def_file}"
    cp theme.xml "./localized/${def_file}.xml"
    for def in "${def_list[@]}"; do
        from="${def%%=*}"
        to="${def#*=}"
        to="${to%?}"
        sed -i'' -e "s/i18n.$from/$to/g" "./localized/${def_file}.xml"
    done
done