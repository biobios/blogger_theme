#!/bin/bash

# 引数の数が1つでない場合はエラーを出力して終了
if [ $# -ne 1 ]; then
    echo "Usage: $0 <src>"
    exit 1
fi

# 引数のファイルが存在しない場合はエラーを出力して終了
if [ ! -f $1 ]; then
    echo "File not found: $1"
    exit 1
fi

# ファイル内のi18n.%を抽出して重複を排除して出力
grep -o 'i18n\.[a-zA-Z0-9_]*' "$1" | sed 's/i18n\.//' | sort | uniq