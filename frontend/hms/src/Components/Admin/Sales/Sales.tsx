import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Fieldset,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  type SelectProps,
} from "@mantine/core";
import { freqMap, medicineCategories } from "../../../data/DropdownData";
import {
  IconCheck,
  IconEdit,
  IconEye,
  IconHome,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import { useEffect, useState } from "react";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { formatDate } from "../../../Utility/DateUtility";
import {
  addMedicine,
  getAllMedicines,
  updateMedicine,
} from "../../../Service/MedicineService";
import { capitalizeFirstLetter } from "../../../Utility/OtherUtility";
import { DateInput } from "@mantine/dates";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addSale,
  getAllSaleItems,
  getAllSales,
} from "../../../Service/SalesService";
import {
  Spotlight,
  type SpotlightActionData,
  spotlight,
} from "@mantine/spotlight";
import React from "react";
import { useDisclosure } from "@mantine/hooks";

import {
  getAllPrescriptions,
  getMedicineByPrescriptionId,
} from "../../../Service/AppointmentService";
interface SaleItem {
  medicineId: string;
  quantity: number;
}

const Sales = () => {
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters: any = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [medicine, setMedicine] = useState<any[]>([]);

  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});
  const [opened, { open, close }] = useDisclosure(false);
  const [saleItems, setSaleItems] = useState<any[]>([]);
  const [actions, setActions] = useState<SpotlightActionData[]>([]);
  // as array
  const form = useForm({
    initialValues: {
      buyerName: "",
      buyerContact: "",
      saleItems: [{ medicineId: "", quantity: 0 }] as SaleItem[],
    },
    validate: {
      saleItems: {
        medicineId: (value) => (value ? null : "Medicine is required"),
        quantity: (value) => (value > 0 ? null : "Quantity must be postitive"),
      },
    },
  });

  useEffect(() => {
    getAllMedicines()
      .then((res) => {
        // console.log("Reports Data: ", res)
        setMedicine(res);
        setMedicineMap(
          res.reduce((acc: any, item: any) => {
            acc[item.id] = item;
            return acc;
          }, {}),
        );
      })
      .catch((err) => {
        console.error("error fetching reports: ", err);
      });
    getAllPrescriptions()
      .then((res) => {
        setActions(
          res.map((prescription: any) => ({
            id: prescription.id,
            label: prescription.patientName,
            description: `Prescribed by Dr. ${prescription.doctorName} on ${formatDate(prescription.prescriptionDate)}`,
            onClick: () => handleImport(prescription),
          })),
        );
      })
      .catch((err) => {
        console.error("Error fetching prescriptions: ", err);
      });

    fetchData();
  }, []);

  const handleImport = (prescription: any) => {
    setLoading(true);

    getMedicineByPrescriptionId(prescription.id)
      .then((res) => {
        setSaleItems(res);
        console.log(res);
        form.setValues({
          buyerName: prescription.patientName,
          saleItems: res
            .filter((medicine: any) => medicine.Id != null)
            .map((medicine: any) => ({
              medicineId: String(medicine.medicineId),
              quantity: calculateQuantity(
                medicine.frequency,
                medicine.duration,
              ),
            })),
        });
      })
      .catch((err) => {
        console.error("Error fetching medicines by prescription id: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const calculateQuantity = (freq: string, duration: number) => {
    const freqValue = freqMap[freq] || 0;
    return Math.ceil(duration * freqValue);
  };

  // const actions: SpotlightActionData[] = [
  //   {
  //     id: "home",
  //     label: "Home",
  //     description: "Get to home page",
  //     onClick: () => console.log("Home"),
  //     leftSection: <IconHome size={24} stroke={1.5} />,
  //   },
  // ];

  const fetchData = () => {
    getAllSales()
      .then((res) => {
        // console.log("Reports Data: ", res)
        setData(res);
      })
      .catch((err) => {
        console.error("error fetching reports: ", err);
      });
  };

  const onEdit = (rowData: any) => {
    setEdit(true);
    form.setValues({
      ...rowData,
      medicineId: String(rowData.medicineId),
      batchNo: rowData.batchNo,
      quantity: rowData.quantity,
      expiryDate: new Date(rowData.expiryDate),
    });
  };
  const handleDetails = (rowData: any) => {
    setLoading(true);
    open();
    getAllSaleItems(rowData.id)
      .then((res) => {
        setSaleItems(res);
        console.log(res);
      })
      .catch((err) => {
        console.error("Error fetching sale items: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSpotLight = () => {
    spotlight.open();
  };
  const handleSubmit = (values: typeof form.values) => {
    let update = false;
    let flag = false;
    values.saleItems.forEach((item: any, index: number) => {
      if (item.quantity > (medicineMap[item.medicineId]?.stock || 0)) {
        flag = true;
        form.setFieldError(
          `saleItems.${index}.quantity`,
          "Quantity exceeds available stock",
        );
      }
    });
    if (flag) {
      errorNotification("Quantity exceeds available stock");
      return;
    }
    const saleItems = values.saleItems.map((x: any) => ({
      ...x,
      unitPrice: medicineMap[x.medicineId]?.unitPrice,
    }));
    const totalAmount = saleItems.reduce(
      (acc: number, item: any) => acc + item.unitPrice * item.quantity,
      0,
    );
    // console.log(values)
    // return;

    setLoading(true);
    addSale({ ...values, saleItems, totalAmount })
      .then((_res) => {
        successNotification(
          `Stock ${update ? "updated" : "added"} successfully`,
        );
        form.reset();
        setEdit(false);
        fetchData();
      })
      .catch((error) => {
        errorNotification(
          error?.response?.data?.errorMessage ||
            `Failed to ${update ? "update" : "create"} Stock`,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center">
        {
          <Button variant="filled" onClick={() => setEdit(true)}>
            Sell Medicine
          </Button>
        }
        <TextInput
          leftSection={<IconSearch />}
          fw={500}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        <ActionIcon>
          <IconEye stroke={1.4} onClick={() => handleDetails(rowData)} />
        </ActionIcon>
      </div>
    );
  };

  const cancel = () => {
    form.reset();
    setEdit(false);
  };

  //
  const addMore = () => {
    form.insertListItem("saleItems", { medicineId: "", quantity: 0 });
  };
  const header = renderHeader();
  const renderSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }: any) => (
    <Group flex="1" gap="xs">
      <div className="flex gap-2 items-center">
        {option.label}
        {option?.manufacturer && (
          <span
            style={{ marginLeft: "auto", fontSize: "0.8em", color: "gray" }}
          >
            {option.manufacturer} - {option.dosage}
          </span>
        )}
      </div>
      {checked && <IconCheck style={{ marginInlineStart: "auto" }} />}
    </Group>
  );

  const statusBody = (rowData: any) => {
    const isExpired = new Date(rowData.expiryDate) < new Date();
    return (
      <Badge color={isExpired ? "red" : "green"}>
        {isExpired ? "Expired" : "Active"}{" "}
      </Badge>
    );
  };

  return (
    <div>
      {!edit ? (
        <DataTable
          removableSort
          header={header}
          value={data}
          stripedRows
          size="small"
          paginator
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={["doctorName", "notes"]}
          emptyMessage="No customers found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column field="buyerName" header="Buyer Name" />
          <Column field="buyerContact" header="Contact Number" />
          <Column field="totalAmount" header="Total Amount" sortable />
          <Column
            field="saleDate"
            header="Sale Date"
            body={(rowData) => formatDate(rowData.saleDate)}
          />

          {/* <Column field="status" header="Status" body={statusBody} /> */}

          <Column
            headerStyle={{ width: "5rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={actionBodyTemplate}
          />
        </DataTable>
      ) : (
        <div>
          <div className="mb-5 flex items-center justify-between ">
            <h3 className="text-xl text-primary-500 font-medium">
              Sell Medicine
            </h3>
            <Button
              variant="filled"
              leftSection={<IconPlus />}
              onClick={handleSpotLight}
            >
              import prescriptions
            </Button>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
            <LoadingOverlay visible={loading} />
            <Fieldset
              className="grid gap-5"
              legend={
                <span className="text-lg font-medium text-primary-500">
                  Buyer information
                </span>
              }
              radius="md"
            >
              <div className="grid gap-2 grid-cols-2">
                <TextInput
                  withAsterisk
                  label="Buyer Name"
                  placeholder="Enter Buyer name"
                  {...form.getInputProps("buyerName")}
                />
                <NumberInput
                  maxLength={10}
                  withAsterisk
                  label="Contact Number"
                  placeholder="Enter Buyer contact"
                  {...form.getInputProps("buyerContact")}
                />
              </div>
            </Fieldset>
            <Fieldset
              className="grid gap-5"
              legend={
                <span className="text-lg font-medium text-primary-500">
                  Medicine information
                </span>
              }
              radius="md"
            >
              <div className="grid gap-4 grid-cols-5">
                {form.values.saleItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="col-span-2">
                      <Select
                        renderOption={renderSelectOption}
                        {...form.getInputProps(`saleItems.${index}.medicineId`)}
                        label="Medicine"
                        placeholder="Select Medicine"
                        data={medicine
                          .filter(
                            (x) =>
                              !form.values.saleItems.some(
                                (item1: any, idx) =>
                                  item1.medicineId == x.id && idx != index,
                              ),
                          )
                          .map((item) => ({
                            ...item,
                            value: "" + item.id,
                            label: item.name,
                          }))}
                      />
                    </div>
                    <div className="col-span-2">
                      <NumberInput
                        rightSectionWidth={80}
                        rightSection={
                          <div className="text-xs flex gap-1 text-white font-medium rounded-md bg-red-400 p-1">
                            Stock: {medicineMap[item.medicineId]?.stock}{" "}
                          </div>
                        }
                        {...form.getInputProps(`saleItems.${index}.quantity`)}
                        min={0}
                        max={medicineMap[item.medicineId]?.stock || 0}
                        clampBehavior="strict"
                        label="Quantity"
                        placeholder="Enter quantity"
                        withAsterisk
                      />
                    </div>
                    <div className="flex items-end justify-between">
                      {item.quantity && item.medicineId ? (
                        <div>
                          Quantity {item.quantity} X{" "}
                          {medicineMap[item.medicineId]?.unitPrice} ={" "}
                          {item.quantity *
                            medicineMap[item.medicineId]?.unitPrice}{" "}
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <ActionIcon
                        size={"lg"}
                        color="red"
                        onClick={() => form.removeListItem("saleItems", index)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <Button
                  onClick={addMore}
                  variant="outline"
                  leftSection={<IconPlus size={16} />}
                >
                  Add more{" "}
                </Button>
              </div>
            </Fieldset>

            <div className="flex item-center gap-5 justify-center">
              <Button
                loading={loading}
                type="submit"
                className="w-full"
                variant="filled"
                color="primary"
              >
                Sell Medicine
              </Button>
              <Button
                loading={loading}
                onClick={cancel}
                variant="filled"
                color="red"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      <Modal
        opened={opened}
        size="xl"
        onClose={close}
        title="Sold Medicine"
        centered
      >
        <div className="grid grid-cols-3 gap-5">
          {saleItems?.map((medicine: any, index: number) => {
            return (
              <Card
                shadow="sm"
                key={medicine.id}
                padding="lg"
                radius="md"
                withBorder
              >
                <Card.Section withBorder inheritPadding py="xs">
                  <Group justify="space-between">
                    <Text fw={700} size="xl">
                      {medicineMap[medicine.medicineId]?.name}
                    </Text>
                    <Badge color="blue" variant="light">
                      ( {medicineMap[medicine.medicineId]?.type})(
                      {medicineMap[medicine.medicineId]?.dosage}) ({" "}
                      {medicineMap[medicine.medicineId]?.manufacturer})
                    </Badge>
                  </Group>
                </Card.Section>

                <Stack mt="md" gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Quantity
                    </Text>
                    <Text size="sm">{medicine.quantity}</Text>
                  </Group>

                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Unit Price
                    </Text>
                    <Text size="sm">{medicine.unitPrice}</Text>
                  </Group>

                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Total Price
                    </Text>
                    <Text size="sm">
                      {medicine.quantity * medicine.unitPrice}
                    </Text>
                  </Group>
                </Stack>
              </Card>
            );
          })}
        </div>

        {saleItems?.length === 0 && (
          <Text size="lg" mt={"md"}>
            No medicine prescribed for this appointment
          </Text>
        )}
      </Modal>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: "Search...",
        }}
      />
    </div>
  );
};

export default Sales;
