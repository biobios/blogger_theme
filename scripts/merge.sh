#!/bin/bash

# 引数のチェック
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <main_xml_file> <include_directory>"
    exit 1
fi

MAIN_XML_FILE=$1
INCLUDE_DIR=$2

MAX_DEPTH=10

declare -A expanded_files

# 再帰的にインクルードを展開する関数
expand_includes() {
    local file_path=$1
    local base_dir=$2
    local depth=$3

    # ファイルが展開済みかチェック
    if [ -n "${expanded_files[$file_path]}" ]; then
        return
    fi

    # 深さが制限を超えていないかチェック
    if [ $depth -gt $MAX_DEPTH ]; then
        echo "Error: Too many levels of includes" >&2
        exit 1
    fi

    # ファイルを展開する
    expanded_files["$file_path"]=""
    while IFS= read -r line || [ -n "${line}" ]; do
        # 行内の最初の<include />タグを検索してそのタグと前後のテキストに分割
        while [[ $line =~ "<include "([^>]*)">" ]]; do
            expanded_files["$file_path"]+="${line%%<include *}"
            local include="${line#*<include }"
            local after="${include#*/>}"
            local include="${include%%>*}:"

            # インクルードファイルのパスを取得
            local include_path="${include#*file=\"}"
            local include_path="${include_path%%\"*}"
            local include_path="${base_dir}/${include_path}"

            # インクルードファイルが存在するかチェック
            if [ ! -f "$include_path" ]; then
                echo "Error: Include file not found: $include_path" >&2
                exit 1
            fi

            # インクルードファイルを展開
            expand_includes "$include_path" "$base_dir" $((depth + 1))

            # インクルードファイルの内容を追加
            expanded_files["$file_path"]+="${expanded_files[$include_path]}"
            line="$after"
        done
        expanded_files["$file_path"]+="$line"$'\n'
    done < "$file_path"

}

# メインファイルのインクルードを展開
expand_includes "$MAIN_XML_FILE" "$INCLUDE_DIR" 0

# 展開結果を出力
printf "%s" "${expanded_files[$MAIN_XML_FILE]}"