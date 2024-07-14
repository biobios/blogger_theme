#!/bin/bash

# 引数の数が2つでない場合はエラーを出力して終了
if [ $# -ne 2 ]; then
    echo "Usage: $0 <file> <properties>"
    exit 1
fi

# 引数のファイルが存在しない場合はエラーを出力して終了
if [ ! -f $1 ]; then
    echo "File not found: $1"
    exit 1
fi

# 引数のプロパティファイルが存在しない場合はエラーを出力して終了
if [ ! -f $2 ]; then
    echo "File not found: $2"
    exit 1
fi

# プロパティファイルを読み込み、1行ずつ処理
while IFS= read -r line || [ -n "${line}" ]; do
    # プロパティファイルの行を「=」で分割してキーと値に分ける
    key="${line%%=*}"
    value="${line#*=}"
    # ファイルの内容を置換して出力
    sed -i'' -e "s/i18n.$key/$value/g" $1
done < $2