import {
  ExclamationCircleIcon,
  MenuIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/outline";
import Button from "components/Button";
import SimpleSelect from "components/forms/SimpleSelect";
import { SortableList } from "components/Sortable";
import Tooltip from "components/Tooltip";
import { getDatasetDefaultMetadata } from "libs/dataset";
import { AccessmodFilesetRole, AccessmodFilesetRoleCode } from "libs/graphql";
import { uniqueId } from "lodash";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";

type StackLayerPrioritiesProps = {
  onChange: (value: object | null) => void;
  className?: string;
  disabled?: boolean;
  value: { id: string | null; class: string | null }[];
  layers: {
    id: string;
    role: { code: AccessmodFilesetRoleCode };
    metadata: any;
    name: string;
  }[];
};

const StackLayerPriorities = (props: StackLayerPrioritiesProps) => {
  const { value = [], onChange, className, layers = [], disabled } = props;
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const layersIds = layers.map((l) => l.id);
    // Check that all items in the value are present in the layers
    const newValue = value.filter(
      (item) => !item.id || layersIds.includes(item.id)
    );

    if (newValue.length !== value?.length) {
      onChange([...newValue]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers]);

  const sortableItems = useMemo(
    () =>
      (value ?? []).map((item) => ({
        key: uniqueId(),
        item,
      })),
    [value]
  );

  const onAddRow = () => {
    onChange([...(value ?? []), { id: null, class: null }]);
  };

  const handleLayerChange = (
    idx: number,
    itemValue: { [key: string]: any }
  ) => {
    const newValue = [...value];
    newValue.splice(idx, 1, { ...value[idx], ...itemValue });
    onChange(newValue);
  };

  const onRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const hasSpecificClasses = useCallback(
    (layerId) => {
      const layer = layers.find((l) => l.id === layerId);

      return [
        AccessmodFilesetRoleCode.LandCover,
        AccessmodFilesetRoleCode.TransportNetwork,
      ].includes(layer?.role?.code as any);
    },
    [layers]
  );

  function getClassOptions(layerId: string): [string, string][] {
    const layer = layers.find((l) => l.id === layerId);
    if (!layer) {
      return [];
    }
    if (layer.role.code === AccessmodFilesetRoleCode.LandCover) {
      const labels =
        layer.metadata?.labels ??
        getDatasetDefaultMetadata(AccessmodFilesetRoleCode.LandCover).labels;
      return Object.entries(labels);
    }
    if (layer.role.code === AccessmodFilesetRoleCode.TransportNetwork) {
      const values =
        layer.metadata?.values ??
        getDatasetDefaultMetadata(AccessmodFilesetRoleCode.TransportNetwork)
          .values;
      return values.map((v: string) => [v, v] as const);
    }

    return [];
  }

  const getItemId = useCallback((item) => item.key, []);
  const handleSortChange = useCallback(
    (value) => {
      onChange(value.map((item: any) => item.item));
    },
    [onChange]
  );

  if (!layers?.length) {
    return <span>{t("Select layers to be able to order them")}</span>;
  }

  return (
    <div className={className}>
      <div className="space-y-2 rounded-md border border-gray-300 px-3 py-4">
        <div className="w-full text-center text-sm italic text-gray-600">
          {t("Top of the stack")}
        </div>
        <SortableList
          items={sortableItems}
          onChange={handleSortChange}
          getItemId={getItemId}
          handle
          renderItem={(item, index, handleProps) => (
            <div className="flex w-full items-center gap-2 rounded-md border border-gray-300 bg-white py-2 px-2">
              <Button variant="outlined" {...handleProps} size="sm">
                <MenuIcon className="h-4 w-4 text-gray-500 hover:text-gray-600" />
              </Button>
              <div className="flex flex-1 items-center gap-2">
                <SimpleSelect
                  value={item.item.id}
                  required
                  onChange={(event) =>
                    handleLayerChange(index, { id: event?.target.value })
                  }
                  className="w-80"
                  placeholder={t("Layer name")}
                >
                  {layers.map((layer) => (
                    <option key={layer.id} value={layer.id}>
                      {layer.name}
                    </option>
                  ))}
                </SimpleSelect>
                {hasSpecificClasses(item.item.id) && (
                  <SimpleSelect
                    className="w-56"
                    value={item.item.class}
                    onChange={(event) =>
                      handleLayerChange(index, {
                        class: event?.target.value || null,
                      })
                    }
                    placeholder={t("All classes")}
                  >
                    {getClassOptions(item.item.id).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </SimpleSelect>
                )}
              </div>
              {item.item?.id && !layers.find((l) => l.id === item.item.id) && (
                <Tooltip label={t("This layer does not exist anymore")}>
                  <ExclamationCircleIcon className="h-4 w-4 text-amber-400" />
                </Tooltip>
              )}
              <Button
                variant="outlined"
                size="sm"
                onClick={() => onRemove(index)}
              >
                <XIcon className="h-4 w-4 text-gray-500 hover:text-gray-600" />
              </Button>
            </div>
          )}
        />
        <Button className="w-full" variant="white" onClick={onAddRow}>
          <PlusIcon className="mr-1.5 h-4 w-4" />
          {t("Add a layer")}
        </Button>
        <div className="w-full text-center text-sm italic text-gray-600">
          {t("Bottom of the stack")}
        </div>
      </div>

      {error && (
        <span className="absolute bottom-2 right-2 rounded-md bg-white p-2 text-sm text-red-400">
          {error}
        </span>
      )}
    </div>
  );
};

export default StackLayerPriorities;
