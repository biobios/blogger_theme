
LOCAL_DEF_DIR := $(CURDIR)/localization_def
LOCAL_DEF_FILES := $(wildcard $(LOCAL_DEF_DIR)/*.properties)
LOCALIZED_DIR := $(CURDIR)/localized
LOCALIZED_FILES := $(patsubst $(LOCAL_DEF_DIR)/%.properties,$(LOCALIZED_DIR)/%.xml,$(LOCAL_DEF_FILES))
TEMP_DIR := $(CURDIR)/temp
SRC_DIR := $(CURDIR)/src
SRC_FILES := $(wildcard $(SRC_DIR)/*)
SRC_MAIN_FILE := $(SRC_DIR)/main.xml

build: $(LOCALIZED_FILES)

$(LOCALIZED_DIR)/%.xml: $(TEMP_DIR)/merged.xml $(LOCAL_DEF_DIR)/%.properties
	@echo "Localizing $*..."
	@cp $< $@
	@./scripts/localize.sh $@ $(LOCAL_DEF_DIR)/$*.properties

$(TEMP_DIR)/merged.xml: $(SRC_FILES)
	@echo "Merging source files..."
	@./scripts/merge.sh $(SRC_MAIN_FILE) $(SRC_DIR) > $(TEMP_DIR)/merged.xml

i18n_keys: $(TEMP_DIR)/merged.xml
	@echo "Extracting i18n keys..."
	@echo "--------------------------------"
	@./scripts/list_localization_keys.sh $<
	@echo "--------------------------------"

.PHONY: build debug i18n_keys

debug:
	@echo "LOCAL_DEF_FILES: $(LOCAL_DEF_FILES)"
	@echo "LOCALIZED_FILES: $(LOCALIZED_FILES)"
	@echo "SRC_FILES: $(SRC_FILES)"
	@echo "SRC_MAIN_FILE: $(SRC_MAIN_FILE)"
	@echo "TEMP_DIR: $(TEMP_DIR)"
	@echo "SRC_DIR: $(SRC_DIR)"
	@echo "LOCALIZED_DIR: $(LOCALIZED_DIR)"